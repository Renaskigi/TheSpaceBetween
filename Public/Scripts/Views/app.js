'use strict';

function midpoint(lat1, long1, lat2, long2) {
    return (lat1 + (lat2 - lat1) * .50, long1 + (long2 - long1) * .50);
}