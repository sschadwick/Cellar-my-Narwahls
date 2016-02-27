//
//  HomeViewController.swift
//  CellarMyNarwhals
//
//  Created by Miles Ranisavljevic on 2/19/16.
//  Copyright © 2016 creeperspeak. All rights reserved.
//

import UIKit

class HomeViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        
//        CellarAPIService.signUpUserWithUsername("miles", password: "password") { (success, response) -> () in
//            if let dataResponse = response {
//                JSONService.jsonObjectFromSignupData(dataResponse)
//            }
//        }
        
        CellarAPIService.logInUserWithUsername("miles", password: "password") { (success, response) -> () in
            if success {
                if let response = response {
                    JSONService.jsonObjectFromSignupData(response)
                }
            }
        }
        
    }
    
}
