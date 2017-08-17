"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const about_component_1 = require("./about.component");
describe('AboutComponent', () => {
    beforeEach(() => testing_1.TestBed.configureTestingModule({ declarations: [about_component_1.AboutComponent] }));
    it('should instantiate the AboutComponent', () => {
        let fixture = testing_1.TestBed.createComponent(about_component_1.AboutComponent);
        expect(fixture.componentInstance instanceof about_component_1.AboutComponent).toBe(true, 'should create AboutComponent');
    });
});
