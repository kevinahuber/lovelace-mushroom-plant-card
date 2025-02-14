import { fireEvent, HomeAssistant } from "custom-card-helpers";
import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import "../../../shared/editor/info-picker";
import { Info } from "../../info";

export type MushInfoSelector = {
    "mush-info": {
        infos?: Info[];
    };
};

@customElement("ha-selector-plant-card-info")
export class HaMushInfoSelector extends LitElement {
    @property() public hass!: HomeAssistant;

    @property() public selector!: MushInfoSelector;

    @property() public value?: string;

    @property() public label?: string;

    protected render() {
        return html`
            <mushroom-plant-card-info-picker
                .hass=${this.hass}
                .infos=${this.selector["mush-info"].infos}
                .label=${this.label}
                .value=${this.value}
                @value-changed=${this._valueChanged}
            ></mushroom-plant-card-info-picker>
        `;
    }

    private _valueChanged(ev: CustomEvent) {
        fireEvent(this, "value-changed", { value: ev.detail.value || undefined });
    }
}
