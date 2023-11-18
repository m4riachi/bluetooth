import { Component, OnInit } from '@angular/core'
import { Bluetooth } from '@nativescript-community/ble';
import { ItemService } from './item.service'
import permissions from "@master.technology/permissions"


@Component({
  selector: 'ns-items',
  templateUrl: './items.component.html',
})
export class ItemsComponent implements OnInit {
  items: any
  bluetooth: Bluetooth = null
  enabled: boolean = false
  selectedIndex: string = 'Sergio'
  frequence: string = ''
  adresse: string = ''

  constructor(private itemService: ItemService) {
    this.bluetooth = new Bluetooth();
  }

  ngOnInit(): void {
    this.items = this.itemService.getItems().map((item) => item.name);
    permissions.requestPermission(permissions.PERMISSIONS.BLUETOOTH)
      .then( () => {
        console.log("Woo Hoo, I have the power!");
      })
      .catch( () => {
        console.log("Uh oh, no permissions - plan B time!");
      });

    this.bluetooth.isBluetoothEnabled().then((enabled) => {
        this.enabled = enabled;
      }
    );
  }
  onTap() {
    this.bluetooth.isBluetoothEnabled().then((enabled) => {
        this.enabled = enabled;
      }
    );
    console.log("enabled: ");

    this.bluetooth.startScanning({
      //filters: [{serviceUUID:'180d'}],
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
    this.frequence = '75';
    this.adresse = '12 Rue Michel de Montaigne, 56000 Vannes';
    this.bluetooth.read({
      peripheralUUID: '00001101-0000-1000-8000-00805f9b34fb',
      serviceUUID: '180d',
      characteristicUUID: '3434-45234-34324-2343'
    }).then(function(result) {
      // fi. a heartrate monitor value (Uint8) can be retrieved like this:
      var data = new Uint8Array(result.value);
      console.log("Your heartrate is: " + data[1] + " bpm");
    }, function (err) {
      console.log("read error: " + err);
    });


  }
}
