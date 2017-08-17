"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const home_component_1 = require("./home.component");
describe('HomeComponent', () => {
    beforeEach(() => testing_1.TestBed.configureTestingModule({ declarations: [home_component_1.HomeComponent] }));
    it('should instantiate the HomeComponent', () => {
        let fixture = testing_1.TestBed.createComponent(home_component_1.HomeComponent);
        expect(fixture.componentInstance instanceof home_component_1.HomeComponent).toBe(true, 'should create HomeComponent');
    });
});
