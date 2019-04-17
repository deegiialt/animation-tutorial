export default class CoordinateTranslator {

  constructor(){
    this.center_coordinate	=	{x:0,y:0,z:0};	//	Default
  }

  /*
  * @param	{Object}	center_coordinate
  * @param	{Int}		center_coordinate.x
  * @param	{Int}		center_coordinate.y
  * @param	{Int}		center_coordinate.z
  * return	{Object}	this
  */
  setCenterCoordinate(coordinate){
    if( coordinate.x )	this.center_coordinate.x = coordinate.x;
    if( coordinate.y )	this.center_coordinate.y = coordinate.y;
    if( coordinate.z )	this.center_coordinate.z = coordinate.z;
    return this;
  }

  /*
  * @param	{Int}		radius
  * @param	{Int}		angle_in_degrees
  * return	{Object}	{x:?,y:?,z:?}			A 2D Cartesian Coordinate
  */
  fromPolar(radius, angle_in_degrees) {
    var angle_in_radians	=	 angle_in_degrees	* Math.PI / 180.0;
    return {
      x	:	+this.center_coordinate.x + +radius * Math.cos(angle_in_radians)
      ,y	:	+this.center_coordinate.y + +radius * Math.sin(angle_in_radians)
    };
  }

  /*
  * @param	{Int}		radius
  * @param	{Int}		angle_in_degrees
  * @param	{Int}		azimuth_in_degrees
  * return	{Object}	{x:?,y:?,z:?}			A 3D Cartesian Coordinate
  */
  fromSpherical(radius, angle_in_degrees, azimuth_in_degrees) {
    var angle_in_radians	=	angle_in_degrees	* Math.PI / 180.0;
    var azimuth_in_radians	=	azimuth_in_degrees	* Math.PI / 180.0;
    return	{
      x	:	+this.center_coordinate.x + +radius * Math.sin(azimuth_in_radians) * Math.cos(angle_in_radians)
      ,y	:	+this.center_coordinate.y + +radius * Math.sin(azimuth_in_radians) * Math.sin(angle_in_radians)
      ,z	:	+this.center_coordinate.z + +radius * Math.cos(azimuth_in_radians)
    };
  }//function
}//class