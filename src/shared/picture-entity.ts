import { css, CSSResultGroup, html, LitElement, TemplateResult } from "lit";
import { property, customElement } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { Layout } from "../utils/layout";

@customElement("mushroom-picture-entity")
export class PictureEntity extends LitElement {
    @property({ attribute: "no-card-style", type: Boolean }) public noCardStyle?: boolean;

    @property() public layout: Layout = "default";

    protected render(): TemplateResult {
        return html`
            <ha-card>
                <slot></slot>
            </ha-card>
        `;
    }

    static get styles(): CSSResultGroup {
        return css`
            ha-card {
                height: 100%;
                box-sizing: border-box;
                padding: 0px;
                display: flex;
                flex-direction: column;
                justify-content: center;
            }
            .container {
                display: flex;
                flex-direction: column;
                flex-shrink: 0;
                flex-grow: 0;
                box-sizing: border-box;
                justify-content: center;
            }
            .container > ::slotted(*:not(:last-child)) {
                margin-bottom: var(--spacing);
            }
            .container.horizontal {
                flex-direction: row;
            }
            .container.horizontal > ::slotted(*) {
                flex: 1;
                min-width: 0;
            }
            .container.horizontal > ::slotted(*:not(:last-child)) {
                margin-right: var(--spacing);
                margin-bottom: 0;
            }
            :host([rtl]) .container.horizontal > ::slotted(*:not(:last-child)) {
                margin-right: initial;
                margin-left: var(--spacing);
                margin-bottom: 0;
            }
        `;
    }
}
