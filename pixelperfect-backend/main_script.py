from argparse import ArgumentParser, ArgumentDefaultsHelpFormatter

import PIL.Image
import constants
import PIL
import statistics
import os
import mysql.connector


def compare_tuple(a, b):
    try:
        for x in range(len(a)-1):
            if a[x] != b[x]:
                return False 
        return True
    except:
        return False

def get_menue_state(complete_path, img_path):
    im = PIL.Image.open(complete_path)
    rgb_im = im.convert('RGB')
    if "right" in img_path:
        for x in range(len(constants.MENUE_RIGHT_POSITIONS) - 1):
            r, g, b = rgb_im.getpixel(constants.MENUE_RIGHT_POSITIONS[x])
            if compare_tuple((r, g, b), constants.MENUE_RED_ACTIVE): # IF RED
                return x
            elif compare_tuple((r, g, b), constants.MENUE_GREEN_ACTIVE): # IF RED
                return x
    elif "left" in img_path:
        for x in range(len(constants.MENUE_LEFT_POSITIONS) - 1):
            r, g, b = rgb_im.getpixel(constants.MENUE_LEFT_POSITIONS[x])
            if compare_tuple((r, g, b), constants.MENUE_RED_ACTIVE): # IF RED
                return x
            elif compare_tuple((r, g, b), constants.MENUE_GREEN_ACTIVE): # IF RED
                return x
    return -1


def crawl_dir_and_add_to_database(path):
    """This methods crawls through given file directory and updates the db with analysed values

    Args:
        path (String): Path for directory which this method has to crawl through
    """
    mydb = mysql.connector.connect(
        host=str(constants.host),
        user=str(constants.user),
        password=str(constants.password),
        port=int(constants.port),
        database=str(constants.database)
    )
    cursor = mydb.cursor()

    for img_path in os.listdir(path):        
        complete_path = path + "\\" + img_path
        print(get_menue_state(complete_path, img_path))
        # set_values_in_database(cursor, complete_path, constants.STATE_SCREENSAVER)
    mydb.commit()
    return


def replaceBackSlashWithDoubleBackSlash(s : str):
    a = s.split("\\")
    r=""
    for x in range(len(a)-1):
        r = r + a[x] + "\\\\"
    r = r + a[len(a)-1]
    return r


def set_values_in_database(cursor, path, state):
    """TThis method sets the values in the DB

    Args:
        cursor (mysql coursor): cursor for db
        path (_type_): Path of screenshot
        state (_type_): State value
    """
    s = replaceBackSlashWithDoubleBackSlash(path)
    query = "INSERT INTO `screenshot` (Path, State) VALUES ('{}', '{}');".format(s, state)
    cursor.execute(query)
    return


def main():
    parser = ArgumentParser(formatter_class=ArgumentDefaultsHelpFormatter)
    parser.add_argument("-p", "--path", default="", type=str, help="Filepath to folder with screenshots")
    args = vars(parser.parse_args())
    
    if args["path"] == "":
        print("No filepath given...")
        return 1
    elif args["path"] == "test":
        pass
    filepath = args["path"]
    crawl_dir_and_add_to_database(filepath)
    return 0


if __name__ == "__main__":
    main()