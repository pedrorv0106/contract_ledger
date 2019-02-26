const Template = require('@accordproject/cicero-core').Template;
const Clause = require('@accordproject/cicero-core').Clause;
const Engine = require('@accordproject/cicero-engine').Engine;

const fs = require('fs');
const path = require('path');

async function main() {
	engine = new Engine();
	const template = await Template.fromDirectory('./template/perishable-goods');
	clause = new Clause(template);
	const sampleTxt = fs.readFileSync(path.resolve(__dirname, 'template/perishable-goods', 'sample.txt'), 'utf8');
	clause.parse(sampleTxt);
	const data = clause.getData();

	console.log(data);


	const request = {};
    const NS = 'org.accordproject.perishablegoods';
    request.$class = `${NS}.ShipmentReceived`;
    request.timestamp = new Date();
    request.unitCount = 3000;
    const shipment = {$class: `${NS}.Shipment`, shipmentId: 'SHIP_001'};
    const readingLow = {$class: `${NS}.SensorReading`, transactionId: 'a', shipment: 'SHIP_001', centigrade: 2, humidity: 80};
    const readingOk = {$class: `${NS}.SensorReading`, transactionId: 'b', shipment: 'SHIP_001', centigrade: 5, humidity: 90};
    const readingHigh = {$class: `${NS}.SensorReading`, transactionId: 'c', shipment: 'SHIP_001', centigrade: 15, humidity: 65};            
    shipment.sensorReadings = [readingLow, readingOk, readingHigh];
    request.shipment = shipment;
    const state = {};
    state.$class = 'org.accordproject.cicero.contract.AccordContractState';
    state.stateId = 'org.accordproject.cicero.contract.AccordContractState#1';
    const result = await engine.execute(clause, request, state);
    
    console.log(result);
}
main();