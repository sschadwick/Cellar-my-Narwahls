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
        if let stringed = String(data: data, encoding: NSUTF8StringEncoding) {
            print("It's a string : \(stringed)")
        } else {
            print("It's something else")
        }
        
//        do {
//            guard let baseObject = try NSJSONSerialization.JSONObjectWithData(data, options: .MutableContainers) as? [String : AnyObject] else { return }
//            print(baseObject.description)
//        } catch {}
    }
}
