//
//  CellarItem.swift
//  CellarMyNarwhals
//
//  Created by Miles Ranisavljevic on 2/25/16.
//  Copyright © 2016 creeperspeak. All rights reserved.
//

import Foundation

class CellarItem {
    
    let itemName: String
    let vintage: Int
    var quantity: Int
    let upc: Int64
    let owner: String
    
    init(itemName: String, vintage: Int, quantity: Int, upc: Int64, owner: String) {
        self.itemName = itemName
        self.vintage = vintage
        self.quantity = quantity
        self.upc = upc
        self.owner = owner
    }
    
}
