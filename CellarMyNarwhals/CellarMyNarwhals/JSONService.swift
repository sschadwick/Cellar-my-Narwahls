//
//  JSONService.swift
//  CellarMyNarwhals
//
//  Created by Miles Ranisavljevic on 2/25/16.
//  Copyright © 2016 creeperspeak. All rights reserved.
//

import Foundation

class JSONService {
    
    class func jsonObjectFromSignupData(data: NSData) {
        do {
            guard let baseObject = try NSJSONSerialization.JSONObjectWithData(data, options: .MutableContainers) as? [String : AnyObject] else { return }
            print(baseObject.description)
        } catch {}
    }
}
