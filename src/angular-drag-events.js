/** 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 *
 * (c) 2015 Alex Spera <speradev@gmail.com>
 */
(function(module){
    module.directive('asDrag', function ($window, $parse) {
        return {
            scope: true,
            link: function(scope, element, attrs) {

                var asDragPress = $parse(attrs.asDragPress);
                var asDragRelease = $parse(attrs.asDragRelease);
                var asDrag = $parse(attrs.asDrag);

                var startX = 0;
                var startY = 0;
                
                element.bind('mousedown touchstart', function(e){
                    clicked = angular.element(e.currentTarget);
                    target = clicked.parent().parent();
                    angular.element($window).bind('mouseup touchend',stopDrag);
                    angular.element($window).bind('mousemove touchmove',onDrag);
                    if(typeof(asDragPress) == 'function'){
                        asDragPress(scope, {$event: e, $dragged: parseEvent(e, true)});
                    }
                    e.preventDefault();
                    return false;
                } );
                var stopDrag = function(e){
                    angular.element($window).unbind('mouseup touchend',stopDrag);
                    angular.element($window).unbind('mousemove touchmove',onDrag);
                    if(typeof(asDragRelease) == 'function'){
                        asDragRelease(scope, {$event: e, $dragged: parseEvent(e)});
                    }
                    e.preventDefault();
                    return false;
                }
                var onDrag = function(e){
                    if(typeof(asDrag) == 'function'){
                        asDrag(scope, {$event: e, $dragged: parseEvent(e)});
                    }
                    e.preventDefault();
                    return false;
                }

                var parseEvent = function(e,start){
                    var coords = {};
                    coords.absX = (e.pageX || e.clientX);
                    coords.absY = (e.pageY || e.clientY);
                    if(start){
                        startX = coords.absX;
                        startY = coords.absY;
                    }
                    coords.draggedX = startX - coords.absX;
                    coords.draggedY = startY - coords.absY;
                    return coords
                }
            }
        }
    });
}(angular.module('as.drag', [])));