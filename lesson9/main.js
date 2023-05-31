

class Trip {

	/** @type {string} */ salesmanName;
	/** @type {Date} */ date;
	/** @type {number} */ distanceTravel;

	/**
	 * 
	 * @param {string} salesmanName 
	 * @param {Date} date 
	 * @param {number} distanceTravel in kilometers 
	 */
	constructor(salesmanName, date, distanceTravel)
	{
		this.salesmanName = salesmanName;
		this.date = date;
		this.distanceTravel = distanceTravel // in kilometers
	}

}

class Car {

	/** @type {boolean} */ free = true;
	/** @type {number} */ kilometrage = 0;
	/** @type {Trip[]} */ tripsMade = [];


	/**
	 * 
	 * @param {string} manufacturerName 
	 * @param {string} modelName 
	 */
	constructor(manufacturerName, modelName) {
		this.manufacturerName = manufacturerName;
		this.modelName = modelName;
	}

	/** @return {void} */
	updateKilometrage() {
		this.kilometrage = this.tripsMade.reduce((acc, trip) => trip.distanceTravel + acc, 0);
	}

	/**
	 * @param {Trip} trip 
	 * @return {void} */
	addTrip(trip) {
		this.tripsMade.push(trip);
		this.updateKilometrage();
	}

}

class CarsInCompany{

	/** @type {string} */ name;
	/** @type {Car[]} */ cars = [];

	constructor(name) {
		this.name = name;
	}

	/**
	 * @param {Car} car 
	 * @return {void}
	 */
	addCar(car) {
		this.cars.push(car);
	}

	/**
	 * @return {Car}
	 */
	getCarWithHighstKilometrage() {
		return this.cars.reduce((prevCar, car) => prevCar.kilometrage < car.kilometrage ? car : prevCar, this.cars[0]);
	}

	/**
	 * @return {Car[]}
	 */
	printAllFreeCars() {
		this.cars.forEach(car => {if(car.free) console.log(`${car.manufacturerName} : ${car.modelName} with kilometrage of ${car.kilometrage} is free.`);});
	}
	
	/**
	 * I choose car model here, in the exercise instructed to use car name but we have car model or car manufacturer only.
	 * @param {string} carModel 
	 * @param {Trip} trip 
	 * @return {void} 
	*/
	addTripToCar(carModel, trip) {
		this.cars.find(car => car.modelName === carModel).addTrip(trip);
	}

}

let company = new CarsInCompany("Riz Cars LTD");

company.addCar(new Car("Mazda", "3"));
company.addCar(new Car("Honda", "Civic"));
company.addCar(new Car("Telsa", "Model 3"));
company.addCar(new Car("Kia", "Sportage"));

company.addTripToCar("3", new Trip("Daniel", new Date(), 120));
company.addTripToCar("Civic", new Trip("Eitan", new Date(), 240));
company.addTripToCar("Civic", new Trip("Eitan", new Date(), 150));
company.addTripToCar("Civic", new Trip("Eitan", new Date(), 50));
company.addTripToCar("Civic", new Trip("Eitan", new Date(), 70));
company.addTripToCar("Model 3", new Trip("Matan", new Date(), 110));
company.addTripToCar("Model 3", new Trip("Matan", new Date(), 210));
company.addTripToCar("Sportage", new Trip("Hen", new Date(), 210));

console.log(company.getCarWithHighstKilometrage());
company.cars.find(car => car.modelName === "Model 3").free = false;
company.printAllFreeCars();

function avg()
{
	let array = [1,2,3,4]
	let sum = 0;

	for(let i = 0 ; i < array.length ; i++)
	{
		sum = sum + array[i];
	}

	let avg = sum / array.length;

	return avg;
}