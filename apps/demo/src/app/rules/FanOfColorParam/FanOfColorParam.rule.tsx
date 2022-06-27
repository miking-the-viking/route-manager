import { RuleEvaluator, RuleDecorator } from '@route-manager/react';
import Color from '../../context/Favourites/Color';

/**
 * If the favourite color is a given color then returns true
 */
function isFanOfColor(favouriteColor: Color, color: Color) {
  return favouriteColor === color;
}

/**
 * Rule: You must be a fan of the color in the parameters to access the page
 */
@RuleDecorator
class FanOfColorParamRule<T extends Record<string, any>> {
  static NOT_A_FAN = (color: Color) =>
    `You are not a fan of ${color} and are therefore not allowed access`;
  constructor(
    /**
     * evaluator function must return null (if the rule passes) or a message indicating the failure
     */
    private readonly evaluator: RuleEvaluator<T> // TODO: App state
  ) {}
  static create() {
    return new FanOfColorParamRule((state) =>
      isFanOfColor(Color.Red, Color.Blue)
        ? null
        : FanOfColorParamRule.NOT_A_FAN(Color.Red)
    );
  }
}

export default FanOfColorParamRule;
