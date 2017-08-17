"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const testing_2 = require("@angular/router/testing");
const app_component_1 = require("./app.component");
describe('AppComponent', () => {
    beforeEach(() => testing_1.TestBed.configureTestingModule({
        imports: [testing_2.RouterTestingModule],
        declarations: [app_component_1.AppComponent]
    }));
    it('should instantiate the AppComponent', () => {
        let fixture = testing_1.TestBed.createComponent(app_component_1.AppComponent);
        expect(fixture.componentInstance instanceof app_component_1.AppComponent).toBe(true, 'should create AppComponent');
    });
});
