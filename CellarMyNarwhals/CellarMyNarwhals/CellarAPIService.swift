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
    
    class func logInUserWithUsername(username: String, password: String, token: String, completion:(success: Bool, response: NSData?) -> ()) {
        let urlString = self.kCellarAPIBaseUrl + "/signin"
        guard let url = NSURL(string: urlString) where username.characters.count > 0 && password.characters.count > 0 else {
            completion(success: false, response: nil)
            return
        }
        let request = NSMutableURLRequest(URL: url)
        request.setValue(token, forHTTPHeaderField: "token")
        let headerValue = "\(username):\(password)"
        if let encoded = String.toBase64(headerValue), decoded = String.fromBase64(encoded) {
            print("encoded: \(encoded)")
            print("decoded: \(decoded)")
            request.setValue("Basic \(encoded)", forHTTPHeaderField: "authorization")
            print("\(request.allHTTPHeaderFields)")
        }
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
            request.setValue("application/json", forHTTPHeaderField: "Content-Type")
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
