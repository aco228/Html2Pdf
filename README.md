# Html2Pdf

Simple html to pdf converter

## How to use

- Find latest version on [releases](https://github.com/aco228/Html2Pdf/releases) and download `build.zip`. 
- When calling application, first argument should be location of `.html` and second should be location where `.pdf` should be saved. (ex: `html2pdf.exe C:/a.html C:/a.pdf`)

# Required arguments
- First parameter should always be location of html
- Second parameter should always be location where pdf should be saved

# Optinal arguments
Pass `help` as argument to get all avaliable arguments

```
Use this properties:
localHtml - Location on machine where html is located
        (defaultValue=null, expectedType='string')

savePath - Location on machine where to save file
        (defaultValue=null, expectedType='string')

marginsType - Specifies the type of margins to use. Uses 0 for default margin, 1 for no margin, and 2 for minimum margin. and width in microns.
        (defaultValue=0, expectedType='number')

scaleFactor - The scale factor of the web page. Can range from 0 to 100.
        (defaultValue=60, expectedType='number')

pageSize - Specify page size of the generated PDF. Can be A3, A4, A5, Legal, Letter, Tabloid or an Object containing height
        (defaultValue=A4, expectedType='string')

printBackground - Whether to print CSS backgrounds.
        (defaultValue=true, expectedType='boolean')

printSelectionOnly - Whether to print selection only.
        (defaultValue=false, expectedType='boolean')

landscape - true for landscape, false for portrait.
        (defaultValue=false, expectedType='boolean')
```

## Response codes
```
Code 0 for 'Success'
Code 1 for 'Internal error'
Code 2 for 'Required parameter missing'
```



