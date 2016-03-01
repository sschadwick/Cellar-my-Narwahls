//
//  JSONService.swift
//  CellarMyNarwhals
//
//  Created by Miles Ranisavljevic on 2/25/16.
//  Copyright © 2016 creeperspeak. All rights reserved.
//

import Foundation

typealias jsonParseCompletion = (success: Bool, token: String?)->()

class JSONService {
    
    class func jsonObjectFromSignupData(data: NSData, completion: jsonParseCompletion) {
        do {
            guard let baseObject = try NSJSONSerialization.JSONObjectWithData(data, options: .MutableContainers) as? [String : AnyObject] else { return }
            guard let token = baseObject["token"] as? String else {
                print("No token received from server.")
                completion(success: false, token: nil)
                return
            }
            completion(success: true, token: token)
        } catch {
            completion(success: false, token: nil)
        }
    }
}
