//
//  Extensions.swift
//  CellarMyNarwhals
//
//  Created by Miles Ranisavljevic on 2/26/16.
//  Copyright © 2016 creeperspeak. All rights reserved.
//

import Foundation

extension String {
    
    static func toBase64(string: String) -> String {
        guard let encodedData = string.dataUsingEncoding(NSUTF8StringEncoding) else {
            return string
        }
        let encodedString = NSData(data: encodedData).base64EncodedStringWithOptions(.Encoding64CharacterLineLength)
        return encodedString
    }
    
    static func fromBase64(string: String) -> String {
        guard let decodedData = NSData(base64EncodedString: string, options: .IgnoreUnknownCharacters), decodedString = String(data: decodedData, encoding: NSUTF8StringEncoding) else {
            return string
        }
        return decodedString
    }
    
}
