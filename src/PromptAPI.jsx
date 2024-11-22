import React from "react";

async function PromptAPI  () {
    const session = await ai.languageModel.create({
        systemPrompt:  `You are front end designer assistant specialized google docs format. 
        I have a blog that contain different kinds of format like bold, italic, code, etc. 
        I need you to help me generate the design for format that not in the document of google docs api. 
        I will give you the document:
        """
        TextStyle
        JSON representation
        {
            "bold": boolean,
            "italic": boolean,
            "underline": boolean,
            "strikethrough": boolean,
            "smallCaps": boolean,
            "backgroundColor": {
              object (OptionalColor)
            },
            "foregroundColor": {
              object (OptionalColor)
            },
            "fontSize": {
              object (Dimension)
            },
            "weightedFontFamily": {
              object (WeightedFontFamily)
            },
            "baselineOffset": enum (BaselineOffset),
            "link": {
              object (Link)
            }
        }

        OptionalColor
        A color that can either be fully opaque or fully transparent.

        JSON representation

        {
            "color": {
                object (Color)
            }
        }

        Color
        A solid color.

        JSON representation

        {
            "rgbColor": {
                object (RgbColor)
            }
        }

        The RGB color value.
        RgbColor
        An RGB color.

        JSON representation

        {
            "red": number,
            "green": number,
            "blue": number
        }

        Dimension
        A magnitude in a single direction in the specified units.

        JSON representation

        {
        "magnitude": number,
        "unit": enum (Unit)
        }
        Fields
        magnitude	
        number

        The magnitude.

        unit	
        enum (Unit)

        The units for magnitude.

        Unit
        Units of measurement.

        Enums
        UNIT_UNSPECIFIED	The units are unknown.
        PT	A point, 1/72 of an inch.
        WeightedFontFamily
        Represents a font family and weight of text.

        JSON representation

        {
        "fontFamily": string,
        "weight": integer
        }
        Fields
        fontFamily	
        string

        The font family of the text.

        The font family can be any font from the Font menu in Docs or from Google Fonts. If the font name is unrecognized, the text is rendered in Arial.

        weight	
        integer

        The weight of the font. This field can have any value that's a multiple of 100 between 100 and 900, inclusive. This range corresponds to the numerical values described in the CSS 2.1 Specification, section 15.6, with non-numerical values disallowed.

        The default value is 400 ("normal").

        The font weight makes up just one component of the rendered font weight. A combination of the weight and the text style's resolved bold value determine the rendered weight, after accounting for inheritance:

        If the text is bold and the weight is less than 400, the rendered weight is 400.
        If the text is bold and the weight is greater than or equal to 400 but is less than 700, the rendered weight is 700.
        If the weight is greater than or equal to 700, the rendered weight is equal to the weight.
        If the text is not bold, the rendered weight is equal to the weight.
        BaselineOffset
        The ways in which text can be vertically offset from its normal position.

        Enums
        BASELINE_OFFSET_UNSPECIFIED	The text's baseline offset is inherited from the parent.
        NONE	The text is not vertically offset.
        SUPERSCRIPT	The text is vertically offset upwards (superscript).
        SUBSCRIPT	The text is vertically offset downwards (subscript).
        """

        example qualified response:
        prompt: generate design for code typ
        `
      });
      
      const result = await session.prompt(`
        generate for type call code
        one example is: 
      `);
      
      console.log(result);
      
    
};

export default PromptAPI;