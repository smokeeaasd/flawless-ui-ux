// Integration study for an existing iOS 16+ SwiftUI application.
// Not compiled or simulator/device-tested in this repository.
import SwiftUI

struct ReadingListStudy: View {
    private let articles = [
        ReadingItem(id: "shelf", title: "Make room for the things you keep", category: "Objects in use", text: "Observe what leaves the shelf most often. Keep those objects reachable and leave enough room to return them without rebuilding the arrangement."),
        ReadingItem(id: "light", title: "A note on afternoon light", category: "Field notes", text: "Watch how the light changes the place where you read. Move the reading position before adding more objects to the room.")
    ]
    @State private var savedIDs: Set<String> = []
    @State private var query = ""

    private var visible: [ReadingItem] {
        articles.filter { query.isEmpty || $0.title.localizedCaseInsensitiveContains(query) }
    }

    var body: some View {
        NavigationStack {
            List {
                Section {
                    Text("A local code study. Saved marks remain only while this view is alive.")
                        .font(.subheadline).foregroundStyle(.secondary)
                }
                Section("Articles · \(visible.count)") {
                    if visible.isEmpty {
                        Text("No matching articles. Change or clear the search.")
                    }
                    ForEach(visible) { article in
                        NavigationLink {
                            ScrollView {
                                VStack(alignment: .leading, spacing: 20) {
                                    Text(article.category).font(.subheadline)
                                    Text(article.title).font(.largeTitle).bold()
                                    Text(article.text).font(.body)
                                    Button(savedIDs.contains(article.id) ? "Remove saved mark" : "Mark for later") {
                                        if savedIDs.contains(article.id) { savedIDs.remove(article.id) }
                                        else { savedIDs.insert(article.id) }
                                    }
                                    .buttonStyle(.bordered)
                                    Text("This mark is local to the example, not synced to an account.")
                                        .font(.footnote).foregroundStyle(.secondary)
                                }
                                .frame(maxWidth: .infinity, alignment: .leading).padding()
                            }
                            .navigationTitle("Article").navigationBarTitleDisplayMode(.inline)
                        } label: {
                            VStack(alignment: .leading, spacing: 6) {
                                Text(article.title).font(.headline)
                                Text(article.category).font(.subheadline).foregroundStyle(.secondary)
                                if savedIDs.contains(article.id) { Label("Marked for later", systemImage: "bookmark.fill").font(.subheadline) }
                            }.padding(.vertical, 6)
                        }
                    }
                }
            }
            .navigationTitle("Reading list")
            .searchable(text: $query, prompt: "Find an article")
        }
    }
}

private struct ReadingItem: Identifiable {
    let id: String
    let title: String
    let category: String
    let text: String
}
