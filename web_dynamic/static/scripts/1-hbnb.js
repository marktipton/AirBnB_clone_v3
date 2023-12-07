#!/usr/bin/node

$(document).ready(function () {
  let amenityIds = [];

  function updateAmenities () {
    const amenitiesH4 = $('#amenities h4');

    amenitiesH4.text(amenityIds.join(', '));
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
