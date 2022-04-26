import {
    ActionHandlerEvent,
    computeRTL,
    computeStateDisplay,
    handleAction,
    hasAction,
    HomeAssistant,
    LovelaceCard,
    LovelaceCardEditor,
} from "custom-card-helpers";
import { css, CSSResultGroup, html, LitElement, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { isActive, isAvailable } from "../../ha/data/entity";
import "../../shared/badge-icon";
import "../../shared/card";
import "../../shared/shape-avatar";
import "../../shared/shape-icon";
import "../../shared/picture-entity";
import { cardStyle } from "../../utils/card-styles";
import { registerCustomCard } from "../../utils/custom-cards";
import { actionHandler } from "../../utils/directives/action-handler-directive";
import { stateIcon as stateIconHelper } from "../../utils/icons/state-icon";
import { getLayoutFromConfig } from "../../utils/layout";
import {
    PICTURE_ENTITY_CARD_EDITOR_NAME,
    PICTURE_CARD_NAME,
    PICTURE_ENTITY_DOMAINS,
} from "./const";
import { PictureEntityCardConfig } from "./picture-entity-card-config";
import { getStateColor, getStateIcon } from "./utils";

registerCustomCard({
    type: PICTURE_CARD_NAME,
    name: "Mushroom Picture Card",
    description: "Card for picture entities",
});

@customElement(PICTURE_CARD_NAME)
export class PictureEntityCard extends LitElement implements LovelaceCard {
    public static async getConfigElement(): Promise<LovelaceCardEditor> {
        await import("./picture-entity-card-editor");
        return document.createElement(PICTURE_ENTITY_CARD_EDITOR_NAME) as LovelaceCardEditor;
    }

    public static async getStubConfig(hass: HomeAssistant): Promise<PictureEntityCardConfig> {
        const entities = Object.keys(hass.states);
        const people = entities.filter((e) => PICTURE_ENTITY_DOMAINS.includes(e.split(".")[0]));
        return {
            type: `custom:${PICTURE_CARD_NAME}`,
            entity: people[0],
        };
    }

    @property({ attribute: false }) public hass!: HomeAssistant;

    @state() private _config?: PictureEntityCardConfig;

    getCardSize(): number | Promise<number> {
        return 1;
    }

    setConfig(config: PictureEntityCardConfig): void {
        this._config = {
            tap_action: {
                action: "more-info",
            },
            hold_action: {
                action: "more-info",
            },
            double_tap_action: {
                action: "more-info",
            },
            ...config,
        };
    }

    private _handleAction(ev: ActionHandlerEvent) {
        handleAction(this, this.hass!, this._config!, ev.detail.action!);
    }

    protected render(): TemplateResult {
        if (!this._config || !this.hass || !this._config.entity) {
            return html``;
        }

        const entity_id = this._config.entity;
        const entity = this.hass.states[entity_id];

        const name = this._config.name || entity.attributes.friendly_name;
        const icon = this._config.icon || stateIconHelper(entity);

        const picture = entity.attributes.entity_picture
            ? entity.attributes.entity_picture
            : undefined;

        const layout = getLayoutFromConfig(this._config);
        const hideState = !!this._config.hide_state;
        const hideName = !!this._config.hide_name;

        const rtl = computeRTL(this.hass);

        return html`
            <div>
                <mushroom-picture-entity .layout=${layout} ?rtl=${rtl}>
                    test
                </mushroom-picture-entity>
            </div>
        `;
    }

    static get styles(): CSSResultGroup {
        return [cardStyle, css``];
    }
}
