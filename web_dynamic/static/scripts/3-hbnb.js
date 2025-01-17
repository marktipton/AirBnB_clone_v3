
$(document).ready(function () {
  const checkedAmenityIds = {};

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
  function fetchPlaces () {
    $.ajax({
      type: 'POST',
      url: `http://${window.location.hostname}:5001/api/v1/places_search/`,
      contentType: 'application/json',
      data: '{}',
      success: (data) => {
        console.log(data);
        const placesSection = $('section.places');
        const sortedData = data.sort((a, b) => a.name > b.name ? 1 : b.name > a.name ? -1 : 0);
        for (const place of sortedData) {
          placesSection.append(`
          <article>
            <div class="title_box">
              <h2>${place.name}</h2>
              <div class="price_by_night">$${place.price_by_night}</div>
            </div>
            <div class="information">
              <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>
                    <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>
                    <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
            </div>
            <div class="user">
                  </div>
                  <div class="description">
                    ${place.description}
                  </div>
          </article>`);
        }
      }
    });
  }
  fetchPlaces();
});
