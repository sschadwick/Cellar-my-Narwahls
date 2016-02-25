//
//  CellarAPIService.swift
//  CellarMyNarwhals
//
//  Created by Miles Ranisavljevic on 2/19/16.
//  Copyright © 2016 creeperspeak. All rights reserved.
//

import Foundation

class CellarAPIService {
    
    static let cellarAPIBaseUrl = "https://evening-anchorage-50670.herokuapp.com/cellar"
    
    class func logInUserWithToken(token: String, completion:(success: Bool) -> ()) {
        //make API call to log in
        // if success
        //completion(success: true)
        //else
        completion(success: false)
    }
    
    class func signUpUserWithUsername(username: String, password: String, completion: (success: Bool, response: NSData?) -> ()) {
        let urlString = self.cellarAPIBaseUrl + "/signup"
        guard let url = NSURL(string: urlString) where username.characters.count > 0 && password.characters.count > 0 else {
            completion(success: false, response: nil)
            return
        }
        do {
            let request = NSMutableURLRequest(URL: url)
            request.HTTPMethod = "POST"
            let bodyParameters = ["username" : "\(username)", "password" : "\(password)"]
            request.HTTPBody = try NSJSONSerialization.dataWithJSONObject(bodyParameters, options: .PrettyPrinted) as NSData
            NSURLSession.sharedSession().dataTaskWithRequest(request, completionHandler: { (data, response, error) -> Void in
                if let httpResponse = response as? NSHTTPURLResponse {
                    print(httpResponse.statusCode)
                }
                if let error = error {
                    print("Error: \(error.localizedFailureReason)")
                }
                if let dataResponse = data {
                    print("Data response: \(dataResponse)")
                    completion(success: true, response: dataResponse)
                } else {
                    completion(success: false, response: nil)
                }
            }).resume()
        } catch {
            completion(success: false, response: nil)
            return
        }
    }
    
}
