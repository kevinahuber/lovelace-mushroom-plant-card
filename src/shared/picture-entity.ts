import { css, CSSResultGroup, html, LitElement, TemplateResult } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("mushroom-picture-entity")
export class PictureEntity extends LitElement {
    protected render(): TemplateResult {
        return html`
            <ha-card>
                <slot></slot>
                <div class="footer">
                    <div class="chip">
                        <ha-icon .icon=${"mdi:camera"}></ha-icon>
                        <ha-icon .icon=${"mdi:account"}></ha-icon>
                    </div>
                </div>
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
                overflow: hidden;
            }
            .footer {
                position: absolute;
                left: 0px;
                right: 0px;
                bottom: 0px;
                display: flex;
                flex-direction: row;
                align-items: center;
                padding: 1em;
            }
            .chip {
                box-sizing: border-box;
                height: 4rem;
                border-radius: 3rem;
                border: 1px solid #b9b9b9;
                backdrop-filter: blur(20px);
                display: inline-flex;
                align-items: center;
                padding: 1em;
                gap: 1.5em;
            }
            .chip ha-icon {
                display: flex;
                --mdc-icon-size: 2em;
                color: white;
                transition: color 280ms ease-in-out;
                animation: var(--icon-animation);
            }
        `;
    }
}
