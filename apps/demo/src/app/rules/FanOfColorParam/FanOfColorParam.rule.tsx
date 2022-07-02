import { RuleEvaluator, RuleDecorator } from '@route-manager/react';
import Color from '../../context/Favourites/Color';
import FavouritesState from '../../context/Favourites/FavouritesState';

/**
 * If the favourite color is a given color then returns true
 */
function isFanOfColor(favouriteColor: Color, color: Color) {
  return favouriteColor === color;
}

type FanOfColorParamState = Pick<FavouritesState, 'color'>;

/**
 * Rule: You must be a fan of the color in the parameters to access the page
 */
@RuleDecorator
class FanOfColorParamRule {
  static NOT_A_FAN = (color: Color) =>
    `You are not a fan of ${color} and are therefore not allowed access`;

  static EVALUATOR: RuleEvaluator<FanOfColorParamState> = (params, state) => {
    console.log('params', params);
    const CURRENT_COLOR = 'hardcoded' as Color;

    const { color: favourite } = state;

    console.log(`Accessing ${CURRENT_COLOR} while being a fan of ${favourite}`);

    return isFanOfColor(favourite, CURRENT_COLOR)
      ? null
      : FanOfColorParamRule.NOT_A_FAN(CURRENT_COLOR);
  };

  //
  // TODO: Avoid constructor and static create by using property decorators
  //
  constructor(
    /**
     * evaluator function must return null (if the rule passes) or a message indicating the failure
     */
    private readonly evaluator: RuleEvaluator<FanOfColorParamState> // TODO: App state
  ) {}

  static create() {
    return new FanOfColorParamRule(FanOfColorParamRule.EVALUATOR);
  }
}

export default FanOfColorParamRule;
