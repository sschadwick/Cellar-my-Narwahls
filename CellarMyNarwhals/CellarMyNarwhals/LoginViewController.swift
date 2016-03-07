//
//  LoginViewController.swift
//  CellarMyNarwhals
//
//  Created by Miles Ranisavljevic on 2/19/16.
//  Copyright © 2016 creeperspeak. All rights reserved.
//

import UIKit

typealias loginViewControllerCompletion = () -> ()

class LoginViewController: UIViewController {
    
    @IBOutlet weak var usernameTextField: UITextField!
    @IBOutlet weak var passwordTextField: UITextField!
    @IBOutlet weak var emailTextField: UITextField!
    @IBOutlet weak var goButton: UIButton!
    @IBOutlet weak var signUpButton: UIButton!
    
    
    var completion: loginViewControllerCompletion?
    
    var loginMode = true
    
    class func identifier() -> String {
        return "LoginViewController"
    }

    override func viewDidLoad() {
        super.viewDidLoad()
    }
    
    @IBAction func goButtonPressed(sender: UIButton) {
    }
    
    @IBAction func signUpButtonPressed(sender: UIButton) {
    }

}
