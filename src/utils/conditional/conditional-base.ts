import { HomeAssistant, LovelaceCard } from "custom-card-helpers";
import { PropertyValues, ReactiveElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ConditionalChipConfig, LovelaceChip } from "../lovelace/chip/types";
import { ConditionalCardConfig } from "../lovelace/types";
import { checkConditionsMet, validateConditionalConfig } from "./validate-condition";

@customElement("mushroom-plant-card-conditional-base")
export class ConditionalBase extends ReactiveElement {
    @property({ attribute: false }) public hass?: HomeAssistant;

    @property() public editMode?: boolean;

    @property() protected _config?: ConditionalCardConfig | ConditionalChipConfig;

    @property({ type: Boolean, reflect: true }) public hidden = false;

    protected _element?: LovelaceCard | LovelaceChip;

    protected createRenderRoot() {
        return this;
    }

    protected validateConfig(config: ConditionalCardConfig | ConditionalChipConfig): void {
        if (!config.conditions) {
            throw new Error("No conditions configured");
        }

        if (!Array.isArray(config.conditions)) {
            throw new Error("Conditions need to be an array");
        }

        if (!validateConditionalConfig(config.conditions)) {
            throw new Error("Conditions are invalid");
        }

        if (this.lastChild) {
            this.removeChild(this.lastChild);
        }

        this._config = config;
    }

    protected update(changed: PropertyValues): void {
        super.update(changed);
        if (!this._element || !this.hass || !this._config) {
            return;
        }

        this._element.editMode = this.editMode;

        const visible = this.editMode || checkConditionsMet(this._config.conditions, this.hass);
        this.hidden = !visible;

        this.style.setProperty("display", visible ? "" : "none");

        if (visible) {
            this._element.hass = this.hass;
            if (!this._element.parentElement) {
                this.appendChild(this._element);
            }
        }
    }
}
