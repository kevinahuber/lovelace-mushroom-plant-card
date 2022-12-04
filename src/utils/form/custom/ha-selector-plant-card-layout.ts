import { fireEvent, HomeAssistant } from "custom-card-helpers";
import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import "../../../shared/editor/layout-picker";

export type MushLayoutSelector = {
    "mush-layout": {};
};

@customElement("ha-selector-plant-card-layout")
export class HaMushLayoutSelector extends LitElement {
    @property() public hass!: HomeAssistant;

    @property() public selector!: MushLayoutSelector;

    @property() public value?: string;

    @property() public label?: string;

    protected render() {
        return html`
            <mushroom-plant-card-layout-picker
                .hass=${this.hass}
                .label=${this.label}
                .value=${this.value}
                @value-changed=${this._valueChanged}
            ></mushroom-plant-card-layout-picker>
        `;
    }

    private _valueChanged(ev: CustomEvent) {
        fireEvent(this, "value-changed", { value: ev.detail.value || undefined });
    }
}
