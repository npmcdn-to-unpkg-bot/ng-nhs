import angular from 'angular';

const BASE_API = "https://data.gov.uk/data/api/service/health/"
const HOSPITAL_API = BASE_API + "hospitals/partial_postcode?partial_postcode="
const CLINICS_API = BASE_API + "clinics/partial_postcode?partial_postcode="
const SOCIAL_CARE_API = BASE_API + "social_care_locations/partial_postcode?partial_postcode="
const PHARMACIES_API = BASE_API + "pharmacies/partial_postcode?partial_postcode="
const GP_SURGERIES_API = BASE_API + "gp_surgeries/partial_postcode?partial="

const nhsFactory = angular.module('app.nhsFactory', []).factory('nhsFactory', ($http,$q,$log) => {
  
  function get(postcode,type) {
  	var deferred = $q.defer();
  	var endpoint = getEndpoint(postcode,type)
    $http.get(endpoint)
    .then(
	    response => {
        if(response.data.result.length>0){
	       deferred.resolve(response.data.result);
        } else {
          deferred.reject({error: 'No results for that postode!'});
        }
	    },
	    error => {
	    	deferred.reject(error);
	    }
    );
    return deferred.promise;
  }

  function trimPostcode(postcode){
    if(postcode.indexOf(' ')<0){
      if(postcode.length == 7){
      return postcode.substring(0,4);
      } else if(postcode.length == 6){
        return postcode.substring(0,3);
      } else if(postcode.length == 5){
        return postcode.substring(0,2);
      } else {
        return postcode;
      }
    } else {
      return postcode.substring(0,postcode.indexOf(' '));
    }
  	
  }

  function getEndpoint(postcode,type){
  	switch(type){
  		case 'hosptial':
  			return HOSPITAL_API + trimPostcode(postcode);
  		case 'clinics':
  			return CLINICS_API + trimPostcode(postcode);
  		case 'social_care':
  			return SOCIAL_CARE_API + trimPostcode(postcode);
  		case 'pharmacies':
  			return PHARMACIES_API + trimPostcode(postcode);
  		case 'gp_surgeries':
  			return GP_SURGERIES_API + trimPostcode(postcode);
  		default:
  			return HOSPITAL_API + trimPostcode(postcode);
  	}
  }

	return {
		get
	};

});

export default nhsFactory;