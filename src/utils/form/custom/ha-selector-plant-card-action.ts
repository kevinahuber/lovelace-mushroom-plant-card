import { ActionConfig, fireEvent, HomeAssistant } from "custom-card-helpers";
import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import "../../../shared/editor/action-picker";

export type Action = ActionConfig["action"];
export type MushActionSelector = {
    "mush-action": {
        actions?: Action[];
    };
};

@customElement("ha-selector-plant-card-action")
export class HaMushActionSelector extends LitElement {
    @property() public hass!: HomeAssistant;

    @property() public selector!: MushActionSelector;

    @property() public value?: string;

    @property() public label?: string;

    protected render() {
        return html`
            <mushroom-plant-card-action-picker
                .hass=${this.hass}
                .actions=${this.selector["mush-action"].actions}
                .label=${this.label}
                .value=${this.value}
                @value-changed=${this._valueChanged}
            ></mushroom-plant-card-action-picker>
        `;
    }

    private _valueChanged(ev: CustomEvent) {
        fireEvent(this, "value-changed", { value: ev.detail.value || undefined });
    }
}
