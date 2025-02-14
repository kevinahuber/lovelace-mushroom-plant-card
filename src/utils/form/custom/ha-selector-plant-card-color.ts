import { fireEvent, HomeAssistant } from "custom-card-helpers";
import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import "../../../shared/editor/color-picker";

export type MushColorSelector = {
    "mush-color": {};
};

@customElement("ha-selector-plant-card-color")
export class HaMushColorSelector extends LitElement {
    @property() public hass!: HomeAssistant;

    @property() public selector!: MushColorSelector;

    @property() public value?: string;

    @property() public label?: string;

    protected render() {
        return html`
            <mushroom-plant-card-color-picker
                .hass=${this.hass}
                .label=${this.label}
                .value=${this.value}
                @value-changed=${this._valueChanged}
            ></mushroom-plant-card-color-picker>
        `;
    }

    private _valueChanged(ev: CustomEvent) {
        fireEvent(this, "value-changed", { value: ev.detail.value || undefined });
    }
}
