function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
    //   return "Geolocation is not supported by this browser.";
    return null;
    }
  }
  
function showPosition(position) {
    // console.log("Latitude: " + position.coords.latitude + "  Longitude: " + position.coords.longitude);
    // return position.coords;
    return "Latitude: " + position.coords.latitude + "Longitude: " + position.coords.longitude;
}