
$(document).ready(function () {
  let checkedAmenityIds = [];

  function updateAmenities () {
    const amenitiesH4 = $('#amenities h4');

    amenitiesH4.text(checkedAmenityIds.join(', '));
  }

  $('input[type="checkbox"]').change(function () {
    const amenityId = $(this).data('id');

    if ($(this).prop('checked')) {
      amenityIds.push(amenityId);
    } else {
      amenityIds = amenityIds.filter(function (id) {
        return id !== amenityId;
      });
    }

    updateAmenities();
  });
});
