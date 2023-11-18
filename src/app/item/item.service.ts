import { Injectable } from '@angular/core'

import { Item } from './item'

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private items = new Array<Item>(
    { id: 1, name: 'Course', role: 'Goalkeeper' },
    { id: 3, name: 'Vélo', role: 'Defender' },
    { id: 4, name: 'Natation', role: 'Midfielder' },
  )

  getItems(): Array<Item> {
    return this.items
  }

  getItem(id: number): Item {
    return this.items.filter((item) => item.id === id)[0]
  }
}
