
$(document).ready(function () {
  let checkedAmenityIds = {};

  function updateAmenities () {
    const amenitiesH4 = $('#amenities_h4');
    const amenitiesString = Object.values(checkedAmenityIds).join(', ');
    amenitiesH4.text(amenitiesString);
  }

  function checkApiStatus () {
    $.get('http://0.0.0.0:5001/api/v1/status/')
      .done(function (data) {
        const apiStatusDiv = $('div#api_status');
        if (data.status == 'OK') {
          apiStatusDiv.attr('class', 'available');
        } else {
          apiStatusDiv.removeClass('available');
        }
      })
      .fail(function (error) {
        console.log(error);
      });
  }
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
    checkApiStatus();
    console.log(checkedAmenityIds);
  });
});
