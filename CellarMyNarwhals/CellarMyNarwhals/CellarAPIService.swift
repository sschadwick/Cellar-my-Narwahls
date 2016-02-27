//
//  CellarAPIService.swift
//  CellarMyNarwhals
//
//  Created by Miles Ranisavljevic on 2/19/16.
//  Copyright © 2016 creeperspeak. All rights reserved.
//

import Foundation

class CellarAPIService {
    
    static let kCellarAPIBaseUrl = "https://evening-anchorage-50670.herokuapp.com/cellar"
    
    class func logInUserWithToken(username: String, password: String, completion:(success: Bool, response: NSData?) -> ()) {
        let urlString = self.kCellarAPIBaseUrl + "/signin"
        guard let url = NSURL(string: urlString) where username.characters.count > 0 && password.characters.count > 0 else {
            completion(success: false, response: nil)
            return
        }
        let request = NSMutableURLRequest(URL: url)
        let headerValue = "Basic \(username):\(password)"
        request.setValue("\(String.toBase64(headerValue))", forHTTPHeaderField: "authorization")
        print("\(request.allHTTPHeaderFields)")
        print("encoded: \(String.toBase64(headerValue))")
        print("decoded: \(String.fromBase64(String.toBase64(headerValue)))")
        NSURLSession.sharedSession().dataTaskWithRequest(request) { (data, response, error) -> Void in
            if let response = response as? NSHTTPURLResponse {
                print(response.statusCode)
            }
            if let error = error {
                print("Error: \(error.localizedFailureReason)")
            }
            if let data = data {
                completion(success: true, response: data)
            } else {
                completion(success: false, response: nil)
            }
        }.resume()
    }
    
    class func signUpUserWithUsername(username: String, password: String, completion: (success: Bool, response: NSData?) -> ()) {
        let urlString = self.kCellarAPIBaseUrl + "/signup"
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
