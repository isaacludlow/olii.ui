import { AfterViewInit, Component, Input } from '@angular/core';
@Component({
  selector: 'base-card',
  template: `
    <ion-card id="BaseCardComponent_IonCard" [button]="cardAsButton" [color]="color">
      <ng-content></ng-content>
    </ion-card>
  `,
  styleUrls: ['./base-card.component.scss']
})
export class BaseCardComponent implements AfterViewInit {
  /** If true, a button tag will be rendered and the card will be tappable. */
  @Input() cardAsButton: boolean = false;

  /** The color to use from your application's color palette.
   * Default options are: "primary", "secondary", "tertiary", "success", "warning", "danger", "light", "medium", and "dark". */
  @Input() color: string = undefined;

  /** If true, the user cannot interact with the card. */
  @Input() disabled: boolean = false;

  /** This attribute instructs browsers to download a URL instead of navigating to it, so the user will be prompted to save it as a local file. */
  @Input() setDownloadAttribute: boolean = false;

  /** Part of the download attribute. If the attribute has a value, it is used as the pre-filled file name in the Save prompt
   * (the user can still change the file name if they want). */
  @Input() downloadFileName: string = null;

  /** If true, adds the href attribute to the ion-card element. If this property is set, an anchor tag will be rendered. */
  @Input() setHref: boolean = false;

  /** Contains a URL or a URL fragment that the hyperlink points to. */
  @Input() hrefUrl: string = null;

  constructor() { }

  ngAfterViewInit(): void {
    if (this.setDownloadAttribute) {
      document.getElementById('BaseCardComponent_IonCard').setAttribute('download', this.downloadFileName ?? '');
    }

    if (this.setHref) {
      document.getElementById('BaseCardComponent_IonCard').setAttribute('href', this.hrefUrl ?? '');
    }
  }
}
