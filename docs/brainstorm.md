# URL Route Generation and Naming (Laravel)

## Issue

> In many applications I've used I have had to hardcode routes - the static portions of them and their dynamic portions. Such as `http://example.com/post/1` or `http://example.com/post/1?search=rocket`

```php
Route::get('/post/{post}', function (Post $post) {
    //
})->name('post.show');
```

## Solution

Simple, canonical names to identify static routes, and a function that can use that static identifier to generate the dynamic portion as well.

```php
route('post.show', ['post' => 1]);
```

## Notes

- I really like the use of a `Symbol` in the SPA to identify the route. The most canonical motherfucker in JavaScript and a variable is much clearer and reusable than a `string` in Laravel.

```typescript
export const WELCOME = Symbol('Welcome');
```

---

# Route Nesting/Grouping (Laravel)

## Issue

> Nested routes typically share attributes - middleware, route parameters, redirect behaviors, etc. I've typically seen a lot of these responsibilities duplicated in components when

## Solution

---

# Route Middleware & Guards (Laravel, NestJs)

## Issue

- https://docs.nestjs.com/guards

> I've only ever seen hand-bombed route middleware and route guards in React, component level, or custom solutions. These should easily be configuration driven with some type-safe context.

```typescript
// nestjs
@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return validateRequest(request);
  }
}
```

## Solution

---

# Route Parameter Validation

## Issue

> Parameters for a route are usually validated manually at the component level. This should be a standard process that supports both synchronous and asynchronous validation.

## Solution

---

# Route Redirect Behavior (may be handled in above)

> I've typically seen route redirection behavior hand rolled in

---

# Route DI??

- have examples in old RRM that were WIP

---

---

# Others

- standardized icon assignment
- lazy load by config
- setup of browser router, helmet, etc.
- automagic setup of browserrouter if missing
- convenience hooks
  - use routes in collection
