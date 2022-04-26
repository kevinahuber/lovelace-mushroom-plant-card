import { fireEvent, HomeAssistant, LovelaceCardEditor } from "custom-card-helpers";
import { CSSResultGroup, html, LitElement, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import memoizeOne from "memoize-one";
import { assert } from "superstruct";
import setupCustomlocalize from "../../localize";
import { configElementStyle } from "../../utils/editor-styles";
import { Action } from "../../utils/form/custom/ha-selector-mushroom-action";
import { GENERIC_FIELDS } from "../../utils/form/fields";
import { HaFormSchema } from "../../utils/form/ha-form";
import { stateIcon } from "../../utils/icons/state-icon";
import { loadHaComponents } from "../../utils/loader";
import { PICTURE_ENTITY_CARD_EDITOR_NAME, PICTURE_ENTITY_DOMAINS } from "./const";
import { PictureEntityCardConfig, personCardConfigStruct } from "./picture-entity-card-config";

const actions: Action[] = ["more-info", "navigate", "url", "call-service", "none"];

const computeSchema = memoizeOne((icon?: string): HaFormSchema[] => [
    { name: "entity", selector: { entity: { domain: PICTURE_ENTITY_DOMAINS } } },
    { name: "name", selector: { text: {} } },
    {
        type: "grid",
        name: "",
        schema: [
            { name: "icon", selector: { icon: { placeholder: icon } } },
            { name: "use_entity_picture", selector: { boolean: {} } },
        ],
    },
    {
        type: "grid",
        name: "",
        schema: [
            { name: "layout", selector: { "mush-layout": {} } },
            { name: "hide_state", selector: { boolean: {} } },
            { name: "hide_name", selector: { boolean: {} } },
        ],
    },
    { name: "tap_action", selector: { "mush-action": { actions } } },
    { name: "hold_action", selector: { "mush-action": { actions } } },
    { name: "double_tap_action", selector: { "mush-action": { actions } } },
]);

@customElement(PICTURE_ENTITY_CARD_EDITOR_NAME)
export class SwitchCardEditor extends LitElement implements LovelaceCardEditor {
    @property({ attribute: false }) public hass?: HomeAssistant;

    @state() private _config?: PictureEntityCardConfig;

    connectedCallback() {
        super.connectedCallback();
        void loadHaComponents();
    }

    public setConfig(config: PictureEntityCardConfig): void {
        assert(config, personCardConfigStruct);
        this._config = config;
    }

    private _computeLabelCallback = (schema: HaFormSchema) => {
        const customLocalize = setupCustomlocalize(this.hass!);

        if (GENERIC_FIELDS.includes(schema.name)) {
            return customLocalize(`editor.card.generic.${schema.name}`);
        }
        return this.hass!.localize(`ui.panel.lovelace.editor.card.generic.${schema.name}`);
    };

    protected render(): TemplateResult {
        if (!this.hass || !this._config) {
            return html``;
        }

        const entityState = this._config.entity ? this.hass.states[this._config.entity] : undefined;
        const entityIcon = entityState ? stateIcon(entityState) : undefined;
        const icon = this._config.icon || entityIcon;
        const schema = computeSchema(icon);

        return html`
            <ha-form
                .hass=${this.hass}
                .data=${this._config}
                .schema=${schema}
                .computeLabel=${this._computeLabelCallback}
                @value-changed=${this._valueChanged}
            ></ha-form>
        `;
    }

    private _valueChanged(ev: CustomEvent): void {
        fireEvent(this, "config-changed", { config: ev.detail.value });
    }

    static get styles(): CSSResultGroup {
        return configElementStyle;
    }
}
