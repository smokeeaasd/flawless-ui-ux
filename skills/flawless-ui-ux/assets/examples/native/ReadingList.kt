// Integration study for an existing Android Jetpack Compose / Material 3 app.
// Not compiled, previewed, or emulator/device-tested in this repository.
package example.readingstudy

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

private data class ReadingItem(val id: String, val title: String, val category: String)
private val articles = listOf(
    ReadingItem("shelf", "Make room for the things you keep", "Objects in use"),
    ReadingItem("light", "A note on afternoon light", "Field notes")
)

@Composable
fun ReadingListStudy() {
    var query by rememberSaveable { mutableStateOf("") }
    var savedIds by rememberSaveable { mutableStateOf(listOf<String>()) }
    val visible = articles.filter { it.title.contains(query.trim(), ignoreCase = true) }
    // Respect the host app's scaffold insets. Do not add these a second time.
    Column(Modifier.fillMaxSize().safeDrawingPadding().padding(horizontal = 16.dp)) {
        Text("Reading list", style = MaterialTheme.typography.headlineLarge,
            modifier = Modifier.padding(top = 24.dp, bottom = 12.dp))
        Text("A local study. Saved marks are not synced or stored in an account.",
            style = MaterialTheme.typography.bodyMedium)
        OutlinedTextField(value = query, onValueChange = { query = it },
            label = { Text("Find an article") }, singleLine = true,
            modifier = Modifier.fillMaxWidth().padding(vertical = 16.dp))
        Text("${visible.size} articles", style = MaterialTheme.typography.titleMedium)
        LazyColumn(Modifier.weight(1f), contentPadding = PaddingValues(bottom = 24.dp)) {
            if (visible.isEmpty()) item {
                Text("No matching articles. Change or clear the search.", Modifier.padding(vertical = 24.dp))
            }
            items(visible, key = { it.id }) { article ->
                Column(Modifier.fillMaxWidth().padding(vertical = 16.dp)) {
                    Text(article.title, style = MaterialTheme.typography.titleLarge)
                    Text(article.category, style = MaterialTheme.typography.bodyMedium)
                    TextButton(onClick = {
                        savedIds = if (article.id in savedIds) savedIds - article.id else savedIds + article.id
                    }) {
                        Text(if (article.id in savedIds) "Remove saved mark for ${article.title}"
                             else "Mark ${article.title} for later")
                    }
                }
                HorizontalDivider()
            }
        }
    }
}
