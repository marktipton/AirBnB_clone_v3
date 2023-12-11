
$(document).ready(function () {
  let checkedAmenityIds = {};

  function updateAmenities () {
    const amenitiesH4 = $('#amenities_h4');
    const amenitiesString = Object.values(checkedAmenityIds).join(', ');
    amenitiesH4.text(amenitiesString);
  }

  function checkApiStatus () {
    $.get('http://127.0.0.1:5001/api/v1/status/', function (data) {
        const apiStatusDiv = $('div#api_status');
        console.log(apiStatusDiv);
        if (data.status == 'OK') {
          apiStatusDiv.addClass('available');
        } else {
          apiStatusDiv.removeClass('available');
        }
      });
    }
  checkApiStatus();
  $('input[type="checkbox"]').change(function () {
    const amenityId = $(this).attr('data-id');
    const amenityName = $(this).attr('data-name');
    if ($(this).prop('checked')) {
      // if checked, add amenityId to checked Amenities list
      checkedAmenityIds[amenityId] = amenityName;
    } else {
      delete checkedAmenityIds[amenityId];
    }
    updateAmenities();
    console.log(checkedAmenityIds);
  });
  function fetchPlaces (dict) {
    $.post(`http://${window.location.hostname}:5001/api/v1/places_search/`, dict,  function (data) {
      console.log(data);
    }, 'json');
  }
  let placesDict = {};
  fetchPlaces(placesDict);
});
