function getDist(x1, y1, x2, y2){
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}

function dist(a, b){
    return (a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y);
}

function findNearestStars(spaceship, stars, affect){
	return stars
	.sort(function(s1, s2){
	    return dist(spaceship, s1) > dist(spaceship, s2);
	})
	.slice(0, affect);
}

function findNearestStar(spaceship, stars){
	return findNearestStars(spaceship, stars, 1)[0];
}

function getClickedStar(spaceship, stars){
	var nStar = findNearestStar(spaceship, stars);
	return Math.sqrt(dist(spaceship, nStar)) <= nStar.r ? nStar: -1;
}

function performAction(star, event, active){
	if (active){
		switch(event){
			case 0:
				// if (availableL > 0){
					star.L += dL;
					availableL -= dL;
				// }
				break;
			case 2:
				// if (availableM > 0){
					star.M += dM;
					availableM -= dM;
				// }
				break;
			default:
		}
	}
}

function detectCollision(ship, stars, boundingRect) {
    var delta = 15;
    var z = stars.every(function (star) {
        return getDist(ship.x, ship.y, star.x, star.y) >= ship.r + star.r - delta;
    });

    return !z || ((ship.x + ship.r) > boundingRect.x2 ||
        (ship.x - ship.r) < boundingRect.x1 ||
        (ship.y + ship.r) >  boundingRect.y2 ||
        (ship.y - ship.r) < boundingRect.y1);
}

function passLevel(ship, portal){
	var rect = {
		x1 : portal.x + 0.25 * portal.w,// - ship.r,
		y1 : portal.y + 0.25 * portal.h,// - ship.r,
		x2 : portal.x + 0.75 * portal.w,// + ship.r,
		y2 : portal.y + 0.75 * portal.h,// + ship.r
	};

	return rect.x1 <= ship.x + ship.r && rect.y1 <= ship.y + ship.r
			&& rect.x2 >= ship.x - ship.r && rect.y2 >= ship.y - ship.r;	
}