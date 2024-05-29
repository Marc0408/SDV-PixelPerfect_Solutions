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


def set_screentag(mydb, cursor, screenid, tagid):
    query = "INSERT INTO `screentag`(`ScreenshotID`, `TagID`) VALUES ('{}','{}')".format(screenid, tagid)
    cursor.execute(query)
    mydb.commit()
    return


def get_screen_id(cursor, path, state): #-1 if not exists
    query = "SELECT * FROM `screenshot` WHERE `Path` = '{}' AND `State` = '{}'".format(path, state)
    cursor.execute(query)
    res = cursor.fetchall()
    if len(res) > 0:
        return res[0][0]
    elif len(res) == 0:
        return -1


def get_tag_id(cursor, tag, value): #-1 if not exists
    query = "SELECT * FROM `tag` WHERE `TagName` = '{}' AND `TagValue` = '{}'".format(tag, value)
    cursor.execute(query)
    res = cursor.fetchall()
    if len(res) > 0:
        return res[0][0]
    elif len(res) == 0:
        return -1

def set_tag_in_db_if_not_exists_otherwise_get_id(mydb, cursor, tag, value):
    id = get_tag_id(cursor, tag, value)
    if id > 0:
        return id
    elif id < 0:
        query = "INSERT INTO `tag` (`TagName`, `TagValue`) VALUES ('{}','{}')".format(tag, value)
        cursor.execute(query)
        mydb.commit()
        return get_tag_id(cursor, tag, value)
    return -1


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
    
    # Clean DB
    query = "TRUNCATE TABLE `screenshot`"
    cursor.execute(query)
    mydb.commit()
     
    for img_path in os.listdir(path):        
        complete_path = path + "\\" + img_path
        complete_path = replaceBackSlashWithDoubleBackSlash(complete_path)
        menue_state = get_menue_state(complete_path, img_path)
        if menue_state >= 0:
            set_values_in_database(mydb, cursor, complete_path, constants.STATE_ACTIVE)
            screen_id = get_screen_id(cursor, complete_path, constants.STATE_ACTIVE)
            tag_id = set_tag_in_db_if_not_exists_otherwise_get_id(mydb, cursor, "Menue", menue_state)
            set_screentag(mydb, cursor, screen_id, tag_id)
        else:
            set_values_in_database(mydb, cursor, complete_path, constants.STATE_INACTIVE)
        # print(get_menue_state(complete_path, img_path))
        # set_values_in_database(cursor, complete_path, constants.STATE_SCREENSAVER)
    
    return


def replaceBackSlashWithDoubleBackSlash(s : str):
    a = s.split("\\")
    r=""
    for x in range(len(a)-1):
        r = r + a[x] + "\\\\"
    r = r + a[len(a)-1]
    return r


def set_values_in_database(mydb, cursor, path, state):
    """TThis method sets the values in the DB

    Args:
        cursor (mysql coursor): cursor for db
        path (_type_): Path of screenshot
        state (_type_): State value
    """
    query = "INSERT INTO `screenshot` (Path, State) VALUES ('{}', '{}');".format(path, state)
    cursor.execute(query)
    mydb.commit()
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