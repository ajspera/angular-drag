Angular directive for very simple click and drag event binding.

This library does not alter any part of the DOM or styles. The intended use for this is as a very lightweight tool to access a common click and drag ui event pattern. This is best if you want to write your own logic for ui manipulation. It can be applied in uses such as cropping interfaces, slider bars, drawing, swiping, etc.

```html
 <button 
     as-drag="onDrag($dragged,$event)" 
     as-drag-press="onDragStart($dragged,$event)" 
     as-drag-release="onDragEnd($dragged,$event)">
     drag me
 </button>
```

- **as-drag-press** fires first on a mousedown or touch screen tap (optional)
- **as-drag** fires on mouse drag or touch drag after the press fires and before the release fires (required to initialize directive, but may be empty)
- **as-drag-release** fires on lift of click or tap (optional)

- **$dragged** argument will return absolute x and y positions, as well as the distances dragged in x and y since the press event.
- **$event** argument will return the native browser event.

```js
(function(app) {

    app.controller('MyAppController', function($scope) {
        $scope.onDragStart = function(dragged,e){
        	// initiate dragging, make something look active in here
        }
        $scope.onDrag = function(dragged,e){
        	// do something with coords, change left or top attributes of something, calculate displayed values or draggable bounds, get creative
        }
        $scope.onDragEnd = function(dragged,e){
        	// end dragging, save the result with final dragged values
        }
    });

}(angular.module("myApp", [
    'as.drag'
])));
```