
$(document).ready(function () {
  let checkedAmenityIds = {};

  function updateAmenities () {
    const amenitiesH4 = $('#amenities_h4');
    const amenitiesString = Object.values(checkedAmenityIds).join(', ');
    amenitiesH4.text(amenitiesString);
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
    console.log(checkedAmenityIds);
  });

  function checkStatus () {
    const statusRep = $('#api_status')
  }
  checkStatus();

});
