function OverlappingRectangles(strArr) { 

  // code goes here


  function Rectangle(x, y, width, height){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  };

  Rectangle.prototype[Symbol.iterator] = function() {
    for(var row = this.y; row < this.y + this.height; row++) {
      for(var col = this.x; col < this.x + this.width; col++){
        yield [col, row];
      }
    }
  }

  Rectangle.fromCoords = function(coordsArray) {
    if(coordsArray.length !== 4) return null;

    const xCoords = coordsArray.map(coords => coords[0]).sort();
    const yCoords = coordsArray.map(coords => coords[1]).sort();

    if(
       xCoords[0] !== xCoords[1] ||
       xCoords[2] !== xCoords[3] ||
       yCoords[0] !== yCoords[1] ||
       yCoords[2] !== yCoords[3]
    ) return null;

    const [x1, x2] = xCoords;
    const [y1, y2] = yCoords;

    const width = Math.abs(x1 - x2);
    const height = Math.abs(y1 -y2);
    const x = Math.min(x1, x2);
    const y = Math.min(y1, y2);

    return new Rectangle(x, y, width, height);
  };

  Rectangle.containsCoords = function(coords) {
    let [x, y] = coords;
    if(
      x >= this.x &&
      x < this.x + this.width && 
      y >= this.y &&
      y < this.y + this.height
    ) return true;

    else return false;
  };

  Rectangle.prototype.area = function() {
    return this.width * this.height;
  };

  Rectangle.areaOverLapping = function (rectangle0, rectangle1){
    let overlap = 0;
    if(typeof rectangle1 === 'object'){
      for(const coords of rectangle1) {
        if(typeof rectangle0 === 'object' && rectangle0.containsCoords(coords)) {
          overlap++;
        }
      }
    }
    return overlap;
  };


  const coords = strArr[0].match(/(-?[0-9]+,-?[0-9]+)/g)
                          .map(pair => pair.split(',').map(num => Number(num)));
  
  const rect0   = Rectangle.fromCoords(coords.splice(0, 4));
  const rect1   = Rectangle.fromCoords(coords);
  const overlap = Rectangle.areaOverLapping(rect0, rect1);

  if(overlap === 0) return 0;

  const numOverlapFirstInRect0 = Math.floor(rect0.area() / overlap);
  return numOverlapFirstInRect0;
 
  return strArr; 

}
   
// keep this function call here 
console.log(OverlappingRectangles(readline()));
