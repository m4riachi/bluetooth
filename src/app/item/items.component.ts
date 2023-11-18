import { Component, OnInit } from '@angular/core'
import { Bluetooth } from '@nativescript-community/ble';
import { ItemService } from './item.service'
import permissions from "@master.technology/permissions"


@Component({
  selector: 'ns-items',
  templateUrl: './items.component.html',
})
export class ItemsComponent implements OnInit {
  bluetooth: Bluetooth = null
  enabled: boolean = false

  constructor(private itemService: ItemService) {
    this.bluetooth = new Bluetooth();
  }

  ngOnInit(): void {
    permissions.requestPermission(permissions.PERMISSIONS.BLUETOOTH)
      .then( () => {
        console.log("Woo Hoo, I have the power!");
      })
      .catch( () => {
        console.log("Uh oh, no permissions - plan B time!");
      });
  }
  onTap() {
    this.bluetooth.isBluetoothEnabled().then((enabled) => {
        this.enabled = enabled;
      }
    );
    console.log("enabled: ");

    this.bluetooth.startScanning({
      filters: [{serviceUUID:'180d'}],
      seconds: 4,
      onDiscovered: function (peripheral) {
        console.log("Periperhal found with UUID: " + peripheral.UUID);
      }
    }).then(() => {
      console.log("scanning complete 1");
    }).catch((err) => {
      console.log("error while scanning 2: " + err);
    }).finally(() => {
      console.log("scanning finished");
    });
  }
}
