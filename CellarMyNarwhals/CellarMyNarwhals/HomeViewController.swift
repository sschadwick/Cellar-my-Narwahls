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
        
//        CellarAPIService.signUpUserWithUsername("miles", password: "password") { (success) -> () in
//            print("\(success ? "success" : "failure")")
//        }
        CellarAPIService.signUpUserWithUsername("miles", password: "password") { (success, response) -> () in
            print("\(success ? "success" : "failure")")
            if let dataResponse = response {
                JSONService.jsonObjectFromSignupData(dataResponse)
            }
        }
        
    }
    
}
