import com.mongodb.BasicDBObject
import com.mongodb.MongoException
import com.mongodb.client.MongoClient
import com.mongodb.client.MongoClients
import com.mongodb.client.MongoCollection
import org.bson.Document
import java.io.File

val dbStringConnection = args[0]
val fileName = args[1]

var mongoClient: MongoClient? = null
var currentLine = 0
var collection:MongoCollection<Document>? = null

createConnection()
println("Read csv file $fileName")

File(fileName).forEachLine {
    if (currentLine != 0 ) {
        val document = convertToModel(it)
        document?.let { saveEntity(it) }
    }
    currentLine++
}
println("Finish")
println("Inserted ${collection!!.find().count()}")
mongoClient!!.close()


fun createConnection() {
    try {
        mongoClient = MongoClients.create(dbStringConnection)
        collection = mongoClient!!.getDatabase("top-streamers").getCollection("streamers")
        println("Connected to MongoDB!")
    } catch (e: MongoException) {
        e.printStackTrace()
    } catch (ex: Exception){
        print(ex)
    }
}

fun convertToModel(row: String): Document? {
    //Channel,Watch time(Minutes),Stream time(minutes),Peak viewers,Average viewers,Followers,Followers gained,Views gained,Partnered,Mature,Language
    return try {
        val data = row.split(",")
        Document("channel", data[0])
            .append("watchTime", data[1])
            .append("streamTime", data[2])
            .append("peakViewers", data[3])
            .append("avgViewers", data[4])
            .append("followers", data[5])
            .append("followersGained", data[6])
            .append("viewsGained", data[7])
            .append("partnered", data[8])
            .append("mature", data[9])
            .append("language", data[10])
    } catch (ex: Exception) {
        println("Error: skip line $currentLine")
        null
    }
}

fun saveEntity(document: Document) {
    collection!!.insertOne(document)
}
