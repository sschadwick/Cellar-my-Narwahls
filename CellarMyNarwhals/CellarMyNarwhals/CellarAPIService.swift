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
        let headerValue = "\(username):\(password)"
        guard let encodedString = headerValue.dataUsingEncoding(NSUTF8StringEncoding) else {
            completion(success: false, response: nil)
            return
        }
        let headerData = NSData(data: encodedString).base64EncodedStringWithOptions(.Encoding64CharacterLineLength)
//        request.setValue("\(username)", forHTTPHeaderField: "username")
//        request.setValue("\(password)", forHTTPHeaderField: "password")
        request.setValue("Basic \(headerData)", forHTTPHeaderField: "authorization")
//        print("encoded: \(headerData)")
//        guard let decodedData = NSData(base64EncodedString: headerData, options:.IgnoreUnknownCharacters) else { return }
//        let decodedString = String(data: decodedData, encoding: NSUTF8StringEncoding)
//        print("decoded: \(decodedString)")
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
